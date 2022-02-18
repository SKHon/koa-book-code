#include <v8.h>
#include <node.h>
#include <nan.h>

using v8::Local;
using v8::Object;
using v8::Number;

NAN_METHOD(sum){
    Nan::HandleScope scope;
    uint32_t sum = 0;
    for(int i = 0; i< info.Length(); i++){
        sum += info[i]->NumberValue();
    }

    info.GetReturnValue().Set(Nan::New(sum));
}

void init (Local<Object> exports)
{
    Nan::HandleScope scope;
    Nan::SetMethod(exports, "sum", sum);
}

NODE_MODULE(memwatch, init);