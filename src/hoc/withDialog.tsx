import React, { ReactNode } from "react";

interface ExternalProps {
}

export interface DialogProps {
    showDialog: (show: boolean) => void
}

interface State {
    dialogVisible: boolean
}

export const withDialog = <OriginalProps extends {}>(
    WrappedComponent: React.ComponentType<OriginalProps & DialogProps>
) => {

    type ResultProps = OriginalProps & ExternalProps;

    return class extends React.Component<ResultProps, State> {
        static displayName = `withDialog(${WrappedComponent.displayName})`;

        constructor(props: Readonly<OriginalProps & ExternalProps>) {
            super(props)
            this.state = {
                dialogVisible: false
            }
        }

        private renderDialog(show: boolean): ReactNode {
            return show && <div>Dialog</div>
        }

        public render(): JSX.Element {
            return <>
                {this.renderDialog(this.state.dialogVisible)}
                <WrappedComponent {...this.props}
                    showDialog={(show) => {
                        this.setState({ dialogVisible: true })
                    }}
                />
            </>
        }
    }
};
