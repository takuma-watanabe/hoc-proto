import React from "react";
import { EventEmitter } from "events";

interface ExternalProps {
    headingAreaTitle: string
    headingAreaDescription: string
}

export interface AdminPageProps {
    eventEmitter: EventEmitter
}

interface State {
}

export const withAdminPageTemplate = <OriginalProps extends {}>(
    WrappedComponent: React.ComponentType<OriginalProps & AdminPageProps>
) => {

    type ResultProps = OriginalProps & ExternalProps;

    return class extends React.Component<ResultProps, State> {
        static displayName = `adminPage(${WrappedComponent.displayName})`;

        constructor(props: Readonly<ResultProps>) {
            super(props);

            this.state = {
            };
        }

        public render(): JSX.Element {
            return (
                <>
                    <AdminPageHeadingArea
                        headingAreaTitle={this.props.headingAreaTitle}
                        headingAreaDescription={this.props.headingAreaDescription}
                    />
                    <HeadingAreaMessage />
                    <WrappedComponent
                        {...this.props} {...this.state}
                        eventEmitter={new EventEmitter}
                    />
                </>
            )
        }
    }
};

interface AdminPageHeadingAreaProps {
    headingAreaTitle: string
    headingAreaDescription: string
}
const AdminPageHeadingArea: React.FC<AdminPageHeadingAreaProps> = (props) => {
    return (<>
        <div>{props.headingAreaTitle}</div>
        <div>{props.headingAreaDescription}</div>
    </>)
}

const HeadingAreaMessage: React.FC = () => {
    return <div></div>
}