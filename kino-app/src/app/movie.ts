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

interface Movie2 {
    id: number,
    title: string,
    description: {
        short: string,
        long: string
    },
    isPremiere: boolean,
    duration: string,
    minAge: number|null,
    imgURL: string| null,
    genre: string,
    score: number[]
}

interface User {
    type: "admin" | "user",
    info: {
        id: number
        userName: String
        userLastName: String
        email:String
        phoneNumber: String
    } | null
}

interface Repertouire {
    // idMovie: [id],
    showing:
        {
    day: string,
    hours: string[],
    roomId: number
}
}