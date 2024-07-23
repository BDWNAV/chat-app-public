import { forwardRef } from "react"

export default forwardRef(function Message({ content, fromUser, profileUrl }, ref) {
  return (
    <div className={`flex flex-row p-1 gap-2 ${fromUser ? "justify-end" : "justify-start"} items-center`} ref={ref}>
      <img src={profileUrl} className={`h-7 w-7 rounded-full ${fromUser ? "order-2" : "order-0"}`}></img>
      <div className="p-2.5 rounded-3xl bg-blue-500">
        <p className="text-sm">{content}</p>
      </div>
    </div>
  )
})