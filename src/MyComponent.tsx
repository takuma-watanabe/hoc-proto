import React, { ReactNode } from "react";
import { createAdminPage, AdminPagePropsSet } from "./hoc/createAdminPage"

interface Props {
    hoge: string
}
interface State {
    test: number
}
class MyComponent extends React.Component<Props & AdminPagePropsSet, State> {

    static displayName = 'MyComponent';
    constructor(props: Readonly<Props & AdminPagePropsSet>) {
        super(props);
    }

    async asyncFunc(num: number): Promise<string> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(`num is ${num}`)
            }, 1000)
        })
    }

    async componentDidMount(): Promise<void> {
        console.log('MyComponent did mount')
        const result = await this.props.asynCall(this.asyncFunc.bind(this), 1000)
        console.log('result = ' + result)
    }

    render(): ReactNode {
        return (<div>
            <div>MyComponent</div>
            <button onClick={() => {
                this.props.history.push('/test2')
            }}>button</button>
        </div>)
    }
}

// export default withAdminPageTemplate(withAsyncCallHandler(withPageTitle(MyComponent)))
export default createAdminPage(MyComponent)
