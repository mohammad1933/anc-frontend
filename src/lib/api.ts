const API_BASE_URL = (
  import.meta.env.VITE_API_URL ??
  "https://astonishing-celebration-production-9392.up.railway.app/api/v1"
).replace(/\/$/, "");

export interface PaginatedResponse<T> {
  data: T[];
  links: Record<string, string | null>;
  meta: { current_page: number; last_page: number; per_page: number; total: number };
}

export interface ApiResource<T> {
  data: T;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly errors: Record<string, string[]> = {},
  ) {
    super(message);
  }
}

type QueryValue = string | number | boolean | null | undefined;

function buildUrl(path: string, query?: Record<string, QueryValue>): string {
  const url = new URL(`${API_BASE_URL}/${path.replace(/^\//, "")}`, window.location.origin);
  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, String(value));
  });
  return url.toString();
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  query?: Record<string, QueryValue>,
): Promise<T> {
  const isFormData = options.body instanceof FormData;
  const token = localStorage.getItem("anc_auth_token");
  const response = await fetch(buildUrl(path, query), {
    ...options,
    headers: {
      Accept: "application/json",
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (response.status === 204) return undefined as T;

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ApiError(
      payload.message ?? "The server could not complete this request.",
      response.status,
      payload.errors ?? {},
    );
  }

  return payload as T;
}

async function getAll<T>(path: string, query: Record<string, QueryValue> = {}): Promise<PaginatedResponse<T>> {
  const first = await request<PaginatedResponse<T>>(path, {}, { ...query, page: 1 });
  if (first.meta.last_page <= 1) return first;

  const remaining = await Promise.all(
    Array.from({ length: first.meta.last_page - 1 }, (_, index) =>
      request<PaginatedResponse<T>>(path, {}, { ...query, page: index + 2 })
    ),
  );

  return {
    ...first,
    data: [first, ...remaining].flatMap((response) => response.data),
    meta: { ...first.meta, current_page: 1, per_page: first.meta.total },
  };
}

function formRequest<T>(path: string, formData: FormData, method: "POST" | "PUT"): Promise<T> {
  if (method === "PUT") formData.set("_method", "PUT");

  return request<T>(path, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  });
}

export const api = {
  get: <T>(path: string, query?: Record<string, QueryValue>) => request<T>(path, {}, query),
  getAll,
  post: <T>(path: string, body: unknown) => request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) => request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown = {}) => request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: <T = void>(path: string) => request<T>(path, { method: "DELETE" }),
  postForm: <T>(path: string, body: FormData) => formRequest<T>(path, body, "POST"),
  putForm: <T>(path: string, body: FormData) => formRequest<T>(path, body, "PUT"),
};

export function toFormData(values: Record<string, unknown>, fileField: string, file: File | null): FormData {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(`${key}[]`, String(item)));
    } else if (typeof value === "boolean") {
      formData.append(key, value ? "1" : "0");
    } else {
      formData.append(key, String(value));
    }
  });

  if (file) formData.append(fileField, file);
  return formData;
}

export function errorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    const firstValidationError = Object.values(error.errors).flat()[0];
    return firstValidationError ?? error.message;
  }
  return error instanceof Error ? error.message : "An unexpected error occurred.";
}
