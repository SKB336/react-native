import { useEffect, useState } from "react";
import { VideoPost, VideoPostsResponse } from "./types";
import { Alert } from "react-native";

const useAppwrite = (fn: () => Promise<any>) => {
    const [data, setData] = useState<VideoPost[]>([]);
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        setIsLoading(true);

        try {
        const response = await fn();
        // * Handling types here because getAllPosts is originally in JS
        const typedResponse = response as VideoPostsResponse;
        
        setData(typedResponse);
        } catch (error: any) {
        Alert.alert('Error', error.message)
        } finally {
        setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => fetchData();

    return { data, isLoading, refetch }
}

export default useAppwrite