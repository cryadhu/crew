import { FeedResponse } from "@/types/response/feeds";
import feeds from "./feeds.json";

const getFeeds = (page: number): Promise<FeedResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(feeds[`page${page}` as keyof typeof feeds] as FeedResponse);
        }, 1000);
    })
}


export { getFeeds };
