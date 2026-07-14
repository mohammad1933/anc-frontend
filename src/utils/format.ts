export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, exponent);
  const precision = value >= 10 || exponent === 0 ? 0 : 1;
  return `${value.toFixed(precision)} ${units[exponent]}`;
}

export function formatDimensions(width: number, height: number): string {
  return `${width} × ${height}px`;
}

export function truncateName(name: string, maxLength = 22): string {
  if (name.length <= maxLength) return name;
  const extIndex = name.lastIndexOf(".");
  const ext = extIndex > -1 ? name.slice(extIndex) : "";
  const base = extIndex > -1 ? name.slice(0, extIndex) : name;
  const keep = Math.max(maxLength - ext.length - 1, 4);
  return `${base.slice(0, keep)}…${ext}`;
}

export function formatDegrees(value: number): string {
  return `${Math.round(value)}°`;
}
