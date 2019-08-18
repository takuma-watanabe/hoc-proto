import React from "react";
import { withPageTitle, PageTitleProps } from "./withPageTitle";
import { withAdminPageTemplate, AdminPageProps } from "./withAdminPageTemplate";
// import { withAsyncCallHandler, AsyncCallHandlerProps } from "./withAsyncCallHandler";
import { withDialog, DialogProps } from "./withDialog";
import { RouteComponentProps } from "react-router-dom";

export type AdminPagePropsSet =
    AdminPageProps & 
    // AsyncCallHandlerProps & 
    PageTitleProps &
    DialogProps &
    RouteComponentProps
    // { history: H.History }

export const createAdminPage = <OriginalProps extends {}>(
    WrappedComponent: React.ComponentType<OriginalProps & AdminPagePropsSet>
) =>
    withDialog(
        // withAsyncCallHandler(
            withAdminPageTemplate(
                withPageTitle(
                    WrappedComponent)))
                    // )
