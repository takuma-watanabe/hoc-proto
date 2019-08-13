import React from "react";

interface ExternalProps {
    pageTitle: string
}

export interface PageTitleProps {
}

interface State {
}

export const withPageTitle = <OriginalProps extends {}>(
    WrappedComponent: React.ComponentType<OriginalProps & PageTitleProps>
) => {

    type ResultProps = OriginalProps & ExternalProps;

    return class extends React.Component<ResultProps, State> {
        static displayName = `withPageTitle(${WrappedComponent.displayName})`;

        componentDidMount(): void {
            document.title = this.props.pageTitle
        }

        public render(): JSX.Element {
            return <WrappedComponent {...this.props} />
        }
    }
};
