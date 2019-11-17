import {Data} from "../serialization/data";
import {Int64Coder, IntCoder} from "../serialization/coders";


export abstract class Request {
    /**
     * 64-bit integer
     */
    public authKey = 0n;

    /**
     * 64-bit integer
     */
    public messageId = 0n;

    public encode(): Uint8Array {
        const data = Data.allocate({initialCapacity: 20});
        const body = this.encodeBody();
        const actualBody = body.select(0, body.offset);


        Int64Coder.shared.encode(this.authKey, data);
        Int64Coder.shared.encode(this.messageId, data);
        IntCoder.shared.encode(actualBody.capacity, data);

        return data.appending(actualBody).bytes;
    }

    protected abstract encodeBody(): Data;
}
