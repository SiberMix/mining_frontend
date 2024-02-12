from telegram import Bot
import subprocess


def get_last_commit_info():
    # Получаем информацию о последнем коммите
    commit_info = subprocess.check_output(['git', 'log', '-1', '--pretty=%B']).decode('utf-8')
    commit_hash = subprocess.check_output(['git', 'rev-parse', 'HEAD']).decode('utf-8').strip()
    commit_author = subprocess.check_output(['git', 'log', '-1', '--pretty=%an']).decode('utf-8').strip()
    branch_name = subprocess.check_output(['git', 'rev-parse', '--abbrev-ref', 'HEAD']).decode('utf-8').strip()
    return commit_author, commit_hash, commit_info, branch_name


async def send_message_to_telegram(commit_author, commit_hash, commit_info, branch_name):
    # Укажите токен вашего бота Telegram
    bot_token = '6554184689:AAEUZkMx7QFH_Dr1HGkKiYWKwCfO5gtxjKA'
    # Укажите ID чата или пользователя, которому нужно отправить сообщение
    chat_id = '-1001926740736'

    # Формируем ссылку на коммит в GitHub
    github_url = f'https://github.com/HectareSystem/hectare_frontend/commit/{commit_hash}'

    # Формируем текст сообщения с форматированием
    message_text = f"<b>{commit_author}</b> выложил обновление в ветку <b>{branch_name}</b>.\n" \
                   f"Коммит: <a href='{github_url}'>{commit_hash}</a>\n\nКомментарий: <b>{commit_info}</b>"

    # Инициализируем бота и отправляем сообщение
    bot = Bot(token=bot_token)
    await bot.send_message(chat_id=chat_id, text=message_text, parse_mode='HTML')


if __name__ == "__main__":
    # Получаем информацию о последнем коммите
    commit_author, commit_hash, commit_info, branch_name = get_last_commit_info()

    # Отправляем сообщение в Telegram
    import asyncio
    asyncio.run(send_message_to_telegram(commit_author, commit_hash, commit_info, branch_name))
