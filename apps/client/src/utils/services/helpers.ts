import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { parseISO } from 'date-fns/parseISO'
import { DEFAULT_PAGE_SIZE } from "@/utils/services/constants";

export function transformTakeSkip({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) {
  return {
    skip: ((page ?? 1) - 1) * (pageSize ?? DEFAULT_PAGE_SIZE),
    take: pageSize ?? DEFAULT_PAGE_SIZE,
  };
}

export function calculatePageNumbers({
  pageNeighbors,
  totalPages,
  currentPage,
}: {
  pageNeighbors: number;
  totalPages: number;
  currentPage: number;
}) {
  const totalNumbers = pageNeighbors * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - pageNeighbors);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);

    let pages: (number | string)[] = Array.from(
      {
        length: endPage - startPage + 1,
      },
      (_, i) => startPage + i
    );
    if (startPage > 2) pages = ["...", ...pages];
    if (endPage < totalPages - 1) pages = [...pages, "..."];
    return [1, ...pages, totalPages];
  }

  return Array.from({ length: totalPages }, (_, i) => i + 1);
}

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const formateDateAgo = (date?: string) => {
  const createdDate = date ? parseISO(date) : new Date();
  return formatDistanceToNow(createdDate, { addSuffix: true });
};

export const formatDateInDDMMYYY = (date: string) => {
  const d = new Date(date);
  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const year = d.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export const formatNumberStyle = (value: number): string => {
  if (value < 1_000) {
    return value.toString();
  } else if (value < 1_000_000) {
    return (value / 1_000).toFixed(value >= 10_000 ? 0 : 1).replace('.', ',') + 'K';
  } else if (value < 1_000_000_000) {
    return (value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1).replace('.', ',') + 'M';
  } else {
    return (value / 1_000_000_000).toFixed(value >= 10_000_000_000 ? 0 : 1).replace('.', ',') + 'B';
  }
}

export const capitalizeEachWord = (input: string): string => {
  if (!input) return '';

  return input
    .toLowerCase()
    .split(' ')
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ');
}

export const testFormData = (formData: FormData) => {
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
}

export const formatDateInYYYYMMDD = (date: string) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}