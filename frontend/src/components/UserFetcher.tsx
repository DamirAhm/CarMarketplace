import {reatomComponent} from "@reatom/npm-react";
import {reatomAsync} from "@reatom/async";
import {getMe} from "../api/getMe";
import {userAtom, userRequestedAtom} from "../atoms/user.atom";
import {useEffect} from "react";

export const fetchMe = reatomAsync(async (ctx) => {
    const user = await getMe();

    if (user) {
        userAtom(ctx, user);
    }
    userRequestedAtom(ctx, true);
})

export const UserFetcher = reatomComponent(({ctx}) => {
    useEffect(() => {
        fetchMe(ctx);
    }, [ctx])

    return null;
})