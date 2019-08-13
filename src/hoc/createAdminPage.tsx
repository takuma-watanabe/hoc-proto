import React from "react";
import { withPageTitle, PageTitleProps } from "./withPageTitle";
import { withAdminPageTemplate, AdminPageProps } from "./withAdminPageTemplate";
import { withAsyncCallHandler, AsyncCallHandlerProps } from "./withAsyncCallHandler";
import { withDialog, DialogProps } from "./withDialog";
import * as H from 'history';

export type AdminPagePropsSet =
    AdminPageProps & AsyncCallHandlerProps & PageTitleProps & 
    DialogProps &
    { history: H.History }

export const createAdminPage =
    <OriginalProps extends {}>(WrappedComponent: React.ComponentType<OriginalProps & AdminPagePropsSet>) => {
        return (
            withDialog(
                withAsyncCallHandler(
                    withAdminPageTemplate(
                        withPageTitle(
                            WrappedComponent
                        )
                    )
                )
            )
        )
    }
