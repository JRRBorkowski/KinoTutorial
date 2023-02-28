import { createSelector } from "@ngrx/store";
import { User } from "src/app/types";

export const selectUser = (state: User) => state

export const selectUserId = createSelector(
    selectUser,
    (state: User) => state.id
)

export const selectUserRole = createSelector(
    selectUser,
    (state: User) => state.role
    )