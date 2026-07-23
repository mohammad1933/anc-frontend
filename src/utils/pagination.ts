export type PaginationItem = number | "ellipsis-start" | "ellipsis-end";

export function paginationItems(currentPage: number, pageCount: number): PaginationItem[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);

  const pages = new Set([1, pageCount, currentPage - 1, currentPage, currentPage + 1]);
  const visible = [...pages].filter((page) => page >= 1 && page <= pageCount).sort((a, b) => a - b);
  const items: PaginationItem[] = [];
  visible.forEach((page, index) => {
    const previous = visible[index - 1];
    if (previous && page - previous > 1) items.push(index === 1 ? "ellipsis-start" : "ellipsis-end");
    items.push(page);
  });
  return items;
}
