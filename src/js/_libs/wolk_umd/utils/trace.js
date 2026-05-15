export default function trace(msgObj,...arg) {
  if(App.IS_TRACE) {
    console.log(msgObj,...arg);
  }
}
