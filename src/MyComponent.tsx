import React, { ReactNode } from "react";
import ASyncCallHandler from "./hoc/asyncCallHandler";
import { AdminPagePropsSet, createAdminPage } from "./hoc/createAdminPage";
import log from 'loglevel';

interface Props {
    hoge: string
}
interface State {
    test: number
}
class MyComponent extends React.Component<Props & AdminPagePropsSet, State> {

    static displayName = 'MyComponent';

    async asyncFunc(num: number): Promise<string> {
        // throw new Error('test')
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(`num is ${num}`)
            }, 1000)
        })
        // return ''
    }

    async componentDidMount(): Promise<void> {
        log.getLogger(MyComponent.displayName).debug('new debug log')
        log.debug('debug log')
        log.debug({a: 1, b:2})

        const result = await ASyncCallHandler.call(
            this.asyncFunc.bind(this, 2000),
            (exception) => {
                log.error('callbacked', exception)
            })
        log.debug('result', result)
    }

    render(): ReactNode {
        return (<div>
            <div>MyComponent</div>
            <button onClick={() => {
                this.props.history.push('/test2')
            }}>button</button>

            <button onClick={() => {
                this.props.showDialog(true)
            }}>dialog</button>
        </div>)
    }
}

export default createAdminPage(MyComponent)
