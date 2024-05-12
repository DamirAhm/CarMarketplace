import {reatomComponent} from "@reatom/npm-react";
import {reatomAsync} from "@reatom/async";
import {getMe} from "../api/getMe";
import {userAtom} from "../atoms/user.atom";
import {useEffect} from "react";

const fetchMe = reatomAsync(async (ctx) => {
    const user = await getMe();

    if (user) {
        userAtom(ctx, user);
    }
})

export const UserFetcher = reatomComponent(({ctx}) => {
    useEffect(() => {
        fetchMe(ctx);
    }, [ctx])

    return null;
})