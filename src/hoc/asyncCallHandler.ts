import log from 'loglevel'

export default class ASyncCallHandler {
    static async call<R>(
        asyncFunction: (...arg: any[]) => R,
        callback: (exception: any) => void,
    ): Promise<R | null> {
        // try {
            log.getLogger('ASyncCallHandler').trace(asyncFunction, callback)
            return await asyncFunction()
        // } catch(e) {
        //     log.getLogger('ASyncCallHandler').error(e)
        //     callback(e)
        // }
        // return null
    }
}
