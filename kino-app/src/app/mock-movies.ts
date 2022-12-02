import { Movie } from "./movie";

export const Movies: Movie[] = [
    {   
        id: 1,
        title: "Tucker and Dale VS Evil",
        description: "Yeehaw pardners",
        shortDescription: "comedy",
        imageSource: "https://pbs.twimg.com/media/EGAmPkYXkAAfe9q.png",
        viewings: ["12:30", "13:00", "14:00"],
        premiere: false,
        score: [1, 2, 2, 3, 1]
    }, 
    {
        id: 2,
        title: "Tucker and Dale VS Evil HD",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        shortDescription: "comedy",
        imageSource: "https://pbs.twimg.com/media/EGAmPkYXkAAfe9q.png",
        viewings: ["12:30", "13:00", "14:00"],
        premiere: true,
        score: [3, 3, 3, 1, 2, 6]
    }
]