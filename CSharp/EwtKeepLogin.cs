using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Timers;

class EwtKeepLogin {
	static void Main(string[] args) {
		var cookies = "";
		if (args.Length > 1) {
			Console.WriteLine("Args > 1!");
			return;
		} else if (args.Length == 0) {
			Console.Write("Please enter your cookies: ");
			cookies = Console.ReadLine();
		} else if (args.Length == 1) {
			if (args[0] == "--help" || args[0] == "-h" || args[0] == "-?") {
				Console.WriteLine("EwtKeepLogin.exe \"you cookies...\"");
				return;
			}
			cookies = args[0];
		}
		var handler = new HttpClientHandler() { UseCookies = false };
		var hc = new HttpClient(handler) { BaseAddress = new Uri("https://web.ewt360.com/customerApi/api/studyprod/lessonCenter/getUserTimeRanking"), Timeout = new TimeSpan(0, 0, 5) };
		hc.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.56");
		hc.DefaultRequestHeaders.Add("Cookie", cookies);
		SetInterval(5500, async e => await Send(hc));
		while (true) {
			var input = Console.ReadLine();
			if (input == "quit") {
				Console.WriteLine("Exit!");
				hc.Dispose();
				break;
			} else if (input == "clear") {
				Console.Clear();
			} else {
				Console.WriteLine("Enter \"quit\" then press \"Enter\" to exit.\r\nEnter \"clear\" then press \"Enter\" to clear console.");
			}
		}
	}
	static async Task Send(HttpClient hc) {
		try {
			Console.WriteLine(await hc.GetStringAsync(""));
		} catch (Exception e) {
			Console.Write("Error! Message: ");
			Console.WriteLine(e);
		}
	}
	public static void SetInterval(double interval, Action<ElapsedEventArgs> action) {
		var timer = new Timer(interval);
		timer.Elapsed += delegate (object sender, ElapsedEventArgs e) { action(e); };
		timer.Enabled = true;
	}
}