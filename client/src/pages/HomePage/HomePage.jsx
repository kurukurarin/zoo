import React from "react";

export default function HomePage() {
    return (
        <>
		<div id="page-wrapper">
				<div className="wrapper">
					<div className="container" id="main">
							<article id="content">
								<header>
									<h2>Урюпинский Зоопарк – Оазис живой природы</h2>
								</header>
								<a href="#" className="image featured"><img src="images/pic06.jpg" alt="" /></a>
								<p> Приветствуем вас в Урюпинском зоопарке — месте, где оживают страницы книг о природе! </p>
								<p> Здесь, в тенистых аллеях, вас ждут встречи с грациозными хищниками, забавными приматами 
									и яркими представителями мира птиц. Наша команда с любовью заботится о каждом питомце, 
									создавая для них комфортные условия, максимально приближенные к естественной среде.</p>
								<p> Мы приглашаем вас отправиться в незабываемое путешествие для всей семьи!</p>
							</article>

						<div className="row features">
							<section className="col-4 col-12-narrower feature">
								<div className="image-wrapper first">
									<a href="#" className="image featured"><img src="images/pic03.jpg" alt="" /></a>
								</div>
								<header>
									<h3>Познакомьтесь с жителями</h3>
								</header>
								<p>Узнайте больше о наших удивительных питомцах: от амурских тигров до забавных сурикатов. Откройте их миры!</p>
								<ul className="actions">
									<li><a className="button">Наши обитатели</a></li>
								</ul>
							</section>
							<section className="col-4 col-12-narrower feature">
								<div className="image-wrapper">
									<a href="#" className="image featured"><img src="images/pic05.jpg" alt="" /></a>
								</div>
								<header>
									<h3>Планируйте ваш визит</h3>
								</header>
								<p>Изучите доступные билеты и удобные абонементы. Найдите подходящий вариант для всей вашей семьи!</p>
								<ul className="actions">
									<li><a className="button">Тарифы и билеты</a></li>
								</ul>
							</section>
						</div>
					</div>
				</div>

				<div id="footer-wrapper">
					<div id="footer" className="container">
						<header className="major">
							<h2>Есть вопросы или идеи? Мы всегда на связи!</h2>
							<p>Поделитесь своими впечатлениями, задайте вопрос или предложите идею для нашего зоопарка! Мы внимательно 
							   читаем каждое сообщение и рады вашему участию. Заполните форму ниже — и мы обязательно ответим вам.</p>
						</header>
						<div className="row">
							<section className="col-6 col-12-narrower">
								<form method="post" action="#">
									<div className="row gtr-50">
										<div className="col-6 col-12-mobile">
											<input name="name" placeholder="Name" type="text" />
										</div>
										<div className="col-6 col-12-mobile">
											<input name="email" placeholder="Email" type="text" />
										</div>
										<div className="col-12">
											<textarea name="message" placeholder="Message"></textarea>
										</div>
										<div className="col-12">
											<ul className="actions">
												<li><input type="submit" value="Send Message" /></li>
												<li><input type="reset" value="Clear form" /></li>
											</ul>
										</div>
									</div>
								</form>
							</section>
							<section className="col-6 col-12-narrower">
								<div className="row gtr-0">
									<ul className="divided icons col-6 col-12-mobile">
										<li className="icon brands fa-youtube"><a href="#"><span className="extra">YouTube-канал</span></a></li>
									</ul>
									<ul className="divided icons col-6 col-12-mobile">
										<li className="icon brands fa-instagram"><a href="#"><span className="extra">instagram блог</span></a></li>
									</ul>
								</div>
							</section>
						</div>
					</div>
					<div id="copyright" className="container">
						<ul className="menu">
							<li>&copy; Elbrus Bootcamp.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
						</ul>
					</div>
				</div>

		</div>
			<script src="assets/js/jquery.min.js"></script>
			<script src="assets/js/jquery.dropotron.min.js"></script>
			<script src="assets/js/browser.min.js"></script>
			<script src="assets/js/breakpoints.min.js"></script>
			<script src="assets/js/util.js"></script>
			<script src="assets/js/main.js"></script>

	</>
    );
}