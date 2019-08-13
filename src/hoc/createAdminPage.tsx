import React from "react";
import { withPageTitle, PageTitleProps } from "./withPageTitle";
import { AdminPageProps, withAdminPageTemplate } from "./withAdminPageTemplate";
import { withAsyncCallHandler, AsyncCallHandlerProps } from "./withAsyncCallHandler";
import * as H from 'history';

export type AdminPagePropsSet =
    AdminPageProps & AsyncCallHandlerProps & PageTitleProps & { history: H.History }

export const createAdminPage =
    <OriginalProps extends {}>(WrappedComponent: React.ComponentType<OriginalProps & AdminPagePropsSet>) => {
        return (
            withAsyncCallHandler(
                withAdminPageTemplate(
                    withPageTitle(
                        WrappedComponent
                    )
                )
            )
        )
    }
