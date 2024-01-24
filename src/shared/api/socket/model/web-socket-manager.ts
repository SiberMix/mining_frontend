export type MessageSocketCallback<T> = (data: T) => void;

export class SocketManager<T> {
  socket: WebSocket | null = null
  address: string
  onMessageCallback?: MessageSocketCallback<T>

  constructor(address: string) {
    this.address = address
  }

  connect(onMessageCallback: MessageSocketCallback<T>) {
    this.onMessageCallback = onMessageCallback
    const callback = this.onMessageCallback // Сохраняем ссылку

    this.socket = new WebSocket(this.address)

    this.socket.onopen = () => {
      console.log('Подключен сокет')
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (callback) {
        callback(data)
      }
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
      console.log('сокет с адресом отключен')
    }
  }
}
