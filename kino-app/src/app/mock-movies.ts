import { Movie } from "./movie";

export const Movies: Movie[] = [
    {   
        title: "Tucker and Dale VS Evil",
        description: "Yeehaw pardners",
        shortDescription: "comedy",
        imageSource: "https://pbs.twimg.com/media/EGAmPkYXkAAfe9q.png",
        viewings: ["12:30", "13:00", "14:00"],
        premiere: false,
        score: [1, 2, 2, 3, 1]
    }, 
    {
        title: "Tucker and Dale VS Evil HD",
        description: "Yeehaw pardners, now in HD!",
        shortDescription: "comedy",
        imageSource: "https://pbs.twimg.com/media/EGAmPkYXkAAfe9q.png",
        viewings: ["12:30", "13:00", "14:00"],
        premiere: true,
        score: [3, 3, 3, 1, 2, 6]
    }
]