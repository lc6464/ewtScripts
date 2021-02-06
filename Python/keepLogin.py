from requests import get
from sys import argv as args
from threading import Thread
from time import sleep, time


def sendMessage(headers):
	while True:
		startTime = time()
		try:
			res = get('https://web.ewt360.com/customerApi/api/studyprod/lessonCenter/getUserTimeRanking', headers=headers, timeout=5)
			print(res.text)
		except Exception as e:
			print('Error! Message: %s' % e)
		endTime = time()
		sleep(5.5 - endTime + startTime)


def keepLogin(cookies):
	headers = {
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.56",
		"Cookie": cookies
	}
	t = Thread(target=sendMessage, args=(headers,))
	t.setDaemon(True)
	t.start()
	while True:
		cmd = input()
		if cmd == "quit":
			print("Exit!")
			break
		elif cmd == "clear":
			print('\033c', end='')
		else:
			print("Enter \"quit\" to exit.\r\nEnter \"clear\" to clear console.")

if __name__ == '__main__':
	if len(args) >= 1:
		if args[0].split('.')[-1] in ['py', 'pyw']:
			args.pop(0)
	if len(args) > 1:
		print("Args > 1!")
	elif len(args) == 0:
		keepLogin(input("Please enter your cookies: "))
	elif len(args) == 1:
		if args[0] == "--help" or args[0] == "-h" or args[0] == "-?":
			print("EwtKeepLogin.exe \"you cookies...\"")
		else:
			keepLogin(args[0])
