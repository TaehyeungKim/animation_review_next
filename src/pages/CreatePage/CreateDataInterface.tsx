interface Thumbnail {
    title: {
        main: string,
        sub: string
    },
    align: string,
    image: File
}

interface Body {
    content: string
}

interface CreateData {
    thumbnail: Thumbnail|undefined,
    body: Body|undefined
}

interface CreateAction {
    type: string,
    thumbnail?: Thumbnail,
    body?: Body
}

export type {Thumbnail, Body, CreateData, CreateAction}