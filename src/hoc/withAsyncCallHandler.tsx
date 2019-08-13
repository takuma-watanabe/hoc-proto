import React from "react";

interface ExternalProps {
}

export type AsyncFunction<R> = (...arg: any[]) => R

export interface AsyncCallHandlerProps {
    asynCall: <R>(fnc: AsyncFunction<R>, ...arg: any[]) => Promise<R | null>
}

export const withAsyncCallHandler = <OriginalProps extends {}>(
    WrappedComponent: React.ComponentType<OriginalProps & AsyncCallHandlerProps>
) => {

    type ResultProps = OriginalProps & ExternalProps;
    return class extends React.Component<ResultProps> {
        static displayName = `withAsyncCallHandler(${WrappedComponent.displayName})`;

        private async funcCall<R>(fnc: AsyncFunction<R>, ...arg: any[]): Promise<R | null> {
            return await fnc(...arg)
        }

        public render(): JSX.Element {
            return (
                <WrappedComponent
                    {...this.props} {...this.state}
                    asynCall={this.funcCall}
                />
            )
        }
    }
}
