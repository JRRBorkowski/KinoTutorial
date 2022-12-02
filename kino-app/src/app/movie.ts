export interface Movie {
    id: number,
    title: string,
    description: string,
    shortDescription: string,
    imageSource: string,
    viewings: string[],
    premiere: boolean
    score: number[]
}