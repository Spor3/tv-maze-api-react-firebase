const BASE_URL = "https://api.tvmaze.com";

type ShowApiResType = {
    show:{
    id: number,
    name: string,
    genres: string[],
    premiered: string,
    ended?: string,
    rating?: {
        average: number
    },
    image?: {
        original:string,
        medium:string
    },
    summary: string,
    type:string
    }
}

type ShowDetailApiResType = {
    id: number,
    name: string,
    genres: string[],
    premiered: string,
    ended?: string,
    rating?: {
        average: number
    },
    image?: {
        original?:string,
        medium?:string
    },
    summary: string,
    type:string
}

export type ShowDetailType = {
    id: number,
    title: string,
    genres: string[],
    startDate: string,
    endDate?: string,
    avgRating?: number,
    image?: {
        original?:string,
        medium?:string
    },
    summary?: string,
    type:string
}

/*  export type ShowType = {
    id:number,
    title:string,
    image?: string
    type: string
} */

export const getShowsBySearch = async (query: string) => {
    query = query.trim()

    if(query.length === 0){
        return []
    }

    const res = await fetch(BASE_URL + "/search/shows?q="+ query)
    const data = await res.json() as ShowApiResType[]
    const mappedData:ShowDetailType[] = data.map(e => ({  
        id:e.show.id,
        title: e.show.name,
        image: {medium:e.show.image?.medium, original:e.show.image?.original},
        type: e.show.type,
        genres: e.show.genres,
        startDate: e.show.premiered,
        endDate: e.show.ended,
        avgRating: e.show.rating?.average,
        summary: e.show.summary,
        }))

    return mappedData;

}

export const getShowById = async(id: number) => {
    if(id === 0)
      return null

    const res = await fetch(BASE_URL+ "/shows/" + id)
    const data: ShowDetailApiResType  = await res.json()
    const mappedData: ShowDetailType = {
        id:data.id,
        title: data.name,
        genres: data.genres,
        startDate: data.premiered,
        endDate: data.ended,
        avgRating: data.rating?.average,
        image: {original:data.image?.original,medium:data.image?.original },
        summary: data.summary,
        type: data.type
    }

    return mappedData
}