const videoQueryRepo = {
    getVideos(): VideoOutputQuery[] {
        const dbVideos: DBVideo[] = []
        const authors: DBAuthor[] = []
        return dbVideos.map(dbVideo => {
            const author = authors.find(a => a._id === dbVideo.authorId)
            return this._mapDBVideoToVideoOutputModel(dbVideo, author!)
        })
    },
    getBannedVideos(): BannedVideoOutputQuery[] {
        const dbVideos: DBVideo[] = []
        const authors: DBAuthor[] = []
        return dbVideos.map(dbVideo => {
            const dbAuthor = authors.find(a => a._id === dbVideo.authorId)
            return {
                id: dbVideo._id,
                title: dbVideo.title,
                author: {
                    id: dbAuthor!._id,
                    name: dbAuthor!.firstName + ' ' + dbAuthor!.lastName
                },
                banReason: dbVideo.banObject!.banReason
            }
        })
    },
    getVideosById(id: string): VideoOutputQuery {
        const dbVideo: DBVideo = {
            _id: '2232',
            title: 'sds ',
            authorId: '',
            banObject: null,
        }
        const author: DBAuthor = {
            _id: '3232',
            lastName: 'sd',
            firstName: 'sd'
        }
        
        return this._mapDBVideoToVideoOutputModel(dbVideo, author)
    },
    _mapDBVideoToVideoOutputModel(dbVideo: DBVideo, author: DBAuthor) {
        return {
            id: dbVideo._id,
            title: dbVideo.title,
            author: {
                id: author!._id,
                name: author!.firstName + ' ' + author!.lastName
            }
        }
    }
}

type DBVideo = {
    _id: string
    title: string
    authorId: string
    banObject: null | {
        isBanned: boolean
        banReason: string
    }
}

type DBAuthor = {
    _id: string
    firstName: string
    lastName: string
}

type VideoOutputQuery = {
    id: string
    title: string
    author: {
        id: string
        name: string
    }
}

type BannedVideoOutputQuery = {
    id: string
    title: string
    author: {
        id: string
        name: string
    }
    banReason: string
}