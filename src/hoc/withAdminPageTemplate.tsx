import React from "react"
import { EventEmitter } from "events"
import log from 'loglevel'

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
        static displayName = `adminPage(${WrappedComponent.displayName})`

        constructor(props: Readonly<ResultProps>) {
            super(props)
            this.state = {
            }
        }

        public render(): JSX.Element {
            return (
                <>
                    <AdminPageHeadingArea
                        headingAreaTitle={this.props.headingAreaTitle}
                        headingAreaDescription={this.props.headingAreaDescription}
                    />
                    <ErrorBoundary>
                        <HeadingAreaMessage />
                        <WrappedComponent
                            {...this.props} {...this.state}
                            eventEmitter={new EventEmitter()}
                        />
                    </ErrorBoundary>
                </>
            )
        }
    }
}

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


interface ErrorBoundaryState {
    hasError: boolean
}
class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
    constructor(props: {}) {
        super(props);
        this.state = { hasError: false };
    }
    componentDidCatch(error: any, errorInfo: any) {
        this.setState({ hasError: true })
        // You can also log the error to an error reporting service
        log.error(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}