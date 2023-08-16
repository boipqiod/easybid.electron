import {contextBridge} from 'electron'


type chatListResponse = {
    lastChatId: string
    chatList: { message: number; name: string }[]
}

contextBridge.exposeInMainWorld('myAPI', {
    getChat: async (lastChatId: string) => {
        console.log("lastChatId", lastChatId)

        try {
            const nodeList = Array.from(document.querySelectorAll('yt-live-chat-text-message-renderer'))
            const chatIds = nodeList.map(node => (node as HTMLElement).id)
            const chatList = nodeList.filter((_, i) => chatIds[i].substring(0, 5) === 'ChwKG')

            let chatStartIndex = 0

            if (lastChatId) {
                const lastChatIndex = chatIds.findIndex(id => id === lastChatId)
                if (lastChatIndex !== -1) chatStartIndex = lastChatIndex + 1
            }
            const relevantChatList = chatList.slice(chatStartIndex)

            if (relevantChatList.length === 0) {
                return {chatList: [], lastChatId}
            }

            const resList: chatListResponse['chatList'] = []
            for (const item of relevantChatList) {
                const data = getNameAndMessage(item as HTMLElement)
                if (data) resList.push(data)
            }

            lastChatId = relevantChatList[relevantChatList.length - 1].id

            const res: chatListResponse = {chatList: resList, lastChatId}
            return res
        } catch (e) {
        }

        function getNameAndMessage(chat: HTMLElement) {
            const name = chat.childNodes[3].childNodes[1].childNodes[3].textContent
            const message = chat.childNodes[3].childNodes[3].textContent

            if (name && message && isNumericString(message)) {
                return {
                    name,
                    message: parseInt(message)
                }
            } else {
                return null
            }
        }

        function isNumericString(input: string): boolean {
            return !isNaN(parseFloat(input)) && isFinite(Number(input))
        }
    },
    sendChat: async (message: string) => {
        const clickEvent = new Event("click", {bubbles: true})
        const inputEvent = new Event("input", {bubbles: true})
        const keyDownEvent = new KeyboardEvent("keydown", {
            key: "Enter",
            keyCode: 13, // For older browsers
            which: 13, // For older browsers
            code: "Enter",
            bubbles: true,
            cancelable: true
        })

        const input = document.querySelector("#input-container #input #input") as HTMLInputElement
        const button = document.querySelector("#send-button button") as HTMLButtonElement

        if (!input || !button) return

        input.focus()
        input.textContent = message
        input.dispatchEvent(inputEvent)
        input.dispatchEvent(keyDownEvent)

        button.click()
        button.dispatchEvent(clickEvent)
    }
})