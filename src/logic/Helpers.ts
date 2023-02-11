export function arrFromRange(start: number, stop: number, step: number = 1)
{
    return Array.from({ length: (stop - start) / step + 1}, (_, i) => start + i * step);
}