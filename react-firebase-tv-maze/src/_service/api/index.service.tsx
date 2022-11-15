const BASE_URL = "https://api.tvmaze.com";

type ShowApiResType = {
    show:{
        id:number,
        name:string,
        type: string,
        image?:{
            medium:string
        }
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
        original:string
    },
    summary: string
}

export type ShowDetailType = {
    id: number,
    title: string,
    genres: string[],
    startDate: string,
    endDate?: string,
    avgRating?: number,
    image?: string,
    summary?: string
}

 export type ShowType = {
    id:number,
    title:string,
    image?: string
    type: string
}

export const getShowsBySearch = async (query: String) => {
    query = query.trim()

    if(query.length === 0){
        return []
    }

    const res = await fetch(BASE_URL + "/search/shows?q="+ query)
    const data = await res.json() as ShowApiResType[]
    const mappedData:ShowType[] = data.map(e => ({  
        id:e.show.id,
        title: e.show.name,
        image: e.show.image?.medium,
        type: e.show.type}))

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
        image: data.image?.original,
        summary: data.summary
    }

    return mappedData
}