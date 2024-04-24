import Link from "next/link";
import { Chat } from "@/types/chat";

const chatData: Chat[] = [
    {
        avatar: "/images/user/user-01.png",
        name: "New Operator Registration",
        text: "A new registration request has been captured, please review",
        time: 12,
        textCount: 1,
        dot: 3,
    },
    {
        avatar: "/images/user/user-01.png",
        name: "Permit Application",
        text: "A new permit request has been captured, please review",
        time: 12,
        textCount: 1,
        dot: 3,
    }
];

const ChatCard = () => {
    return (
        <div
            className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
            <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
                Notifications
            </h4>

            <div>
                {chatData.map((chat, key) => (
                    <Link
                        href="/"
                        className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
                        key={key}
                    >
                        <div className="flex flex-1 items-center justify-between">
                            <div>
                                <h5 className="font-medium text-black dark:text-white">
                                    {chat.name}
                                </h5>
                                <p>
                                    <span className="text-sm text-black dark:text-white">
                                        {chat.text}
                                    </span>
                                    <span className="text-xs"> . {chat.time} min</span>
                                </p>
                            </div>
                            {chat.textCount !== 0 && (
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                                    <span className="text-sm font-medium text-white">
                                        {" "}
                                        {chat.textCount}
                                    </span>
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ChatCard;
