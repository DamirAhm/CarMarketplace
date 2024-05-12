import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export const useSavedPage = () => {
    const router = useRouter();

    const [savedPage, setSavedPage] = useState(() => {
        const value = sessionStorage && sessionStorage.getItem('savedPage');

        return value || '/';
    });

    useEffect(() => {
        sessionStorage.setItem('savedPage', savedPage);
    }, [savedPage])

    const navigate = () => {
        router.push(savedPage);
    }

    return {navigate, setSavedPage};
}