export default function MessageSkeleton({ fromUser }) {
  return (
    <div className={`flex flex-row p-1 gap-2 ${fromUser ? "justify-end" : "justify-start"} items-center animate-pulse`}>
      <div className={`h-7 w-7 rounded-full bg-gray-700 ${fromUser ? "order-2" : "order-0"}`}></div>
      <div className="p-2.5 rounded-3xl h-5 w-64 bg-gray-700"></div>
    </div>
  )
}