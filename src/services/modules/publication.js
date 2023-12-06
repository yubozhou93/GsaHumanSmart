import hyRequest from "../request/index"

export function getPublicationAll(){
    return hyRequest.get({
        url:"/journalname"
    })
}