Scheduler.controller('Catalog', function ($scope, $http, $routeParams) {

	if (!/^\d{4}$/.test($routeParams.year) || !/^(SP|SU|FA)$/.test($routeParams.sess) || !/^[A-Z0-9]{3,5}$/.test($routeParams.disc))
		return;

	api($routeParams.year + '/' + $routeParams.sess + '?disc=' + $routeParams.disc, function (courses) {
		console.log($scope.courses = courses);
		$scope.$apply();
	});
	
// var sectionsSaved = Data.sectionsSaved(crs.crs_no);
/*
			// Generate the requirements list.
			var reqs = crs.reqs ? crs.reqs.map(function (reqgrp) {
				return reqgrp.map(function (req) {
					if (req.type === 'course') {
						// The course number is funny -- FREN1***** means FREN 100 or greater. Make it more intuitive to understand. */
						//var crs_no = (req.crs_no + '******').substr(0, 'MATH131'.length).replace(/\*/g, 'x') + req.crs_no.substr('MATH131'.length).replace(/\*/g, ' ');
						/*return '<b title="with at least a ' + req.grade + '">' + colorCourseName(crs_no).trim() + '</b>' + (req.category !== 'P' ? ' (' + catTable[req.category] + ')' : '');
					}
					else if (req.type === 'exam')
						return '<b>' + req.exam + '</b> (' + req.score + ')';
				}).sort().join(', ');
			}) : [];

			// Make footnotes for the section requirements.
			var footnotes = [];

			// Generate the HTML.
			var details = document.createElement('div');
			details.className = 'course-details';
			details.innerHTML = '\
					' + (reqs.length ? '<div class="course-reqs"><i>Requirements</i>: [' + reqs.join('] <span style="font-variant: small-caps">or</span> [') + ']</div>' : '') + '\
					<table class="sections">\
						' + crs.sections.map(function (sec) {

							var instructors = [];
							sec.meetings.forEach(function (mtg) {
								instructors = instructors.concat(mtg.instructors.map(function (instr) { return instr.join(' ').trim(); }));
							});
							instructors = unique(instructors).sort();

							var reqs = sec.reqs ? sec.reqs.map(function (req) {
								var index = footnotes.indexOf(req);
								return 1 + index || footnotes.push(req);
							}).sort() : [];

							return '\
								<tr class="section-row">\
									<td class="section-head">\
										<b>Section ' + sec.sec_no + '</b><sup>' + reqs.join(',') + '</sup><br />\
										<b>' + (sec.title ? sec.title + '<br />' : '') + '</b>\
										<i>' + instructors.join('<br />') + '</i>\
									</td>\
									<td>\
										<table class="meetings">' +
									sec.meetings.map(function (mtg) {
										if (+mtg.beg_tm == 0 && (+mtg.end_tm == 0 || +mtg.end_tm == 1200))
											return '';

										return '\
											<tr title="' + mtg.instructors.map(function (instr) { return instr.join(' '); }).sort().join('; ') + '">\
												<td>' + (mtg.im !== 'XX' ? imTable[mtg.im] + ':' : '') + '</td>\
												<td>' + mtg.days.replace(/-/g, '') + '</td>\
												<td>' + formatTime(mtg.beg_tm, false) + '&ndash;' + formatTime(mtg.end_tm, true) +
													(mtg.building || mtg.room ? ', ' : '') + mtg.building + ' ' + mtg.room + '\
												</td>\
											</tr>';
									}).join('') + '\
										</table>\
									</td>\
									<td class="section-dates">' + sec.beg_date + '<br />' + sec.end_date + '</td>\
									<td class="section-numbers">\
										<span>enrolled:</span> ' + sec.reg_num + '<br />\
										<span>max:</span> ' + sec.reg_max + '\
									</td>\
									<td class="section-units">' + (sec.units * (crs.crs_no.substr('MATH131  '.length, 2) === 'HM' ? 1 : 3)).toFixed(2) + '</td>\
									<td class="section-check"><input type="checkbox" checked /></td>\
								</tr>\
							';
						}).join('') + '\
					</table>\
					<div class="course-footnotes">\
					' + footnotes.map(function (footnote, i) {
						return '<sup>' + (i + 1) + '</sup>' + footnote;
					}).join('<br />') + '\
					</div>';

			row.querySelector('.course-entry').appendChild(details);
		}*/

	$scope.save = function (crs) {
		if (Data.sectionsSaved(crs.crs_no).length)
			Data.removeCourse(crs);
		else
			Data.saveCourse(crs);
		crs._saved = !crs._saved;
		/*
		var sectionsSaved = Data.sectionsSaved(crs.crs_no);
		row.className = sectionsSaved.length === 0 ? '' : (sectionsSaved.length === crs.sections.length ? 'course-saved' : 'course-partially-saved');*/
	}
	

});


var categories = {

	
	'Arts and Humanities': {
		'ARCN': 'Art Conservation',
		'ARHI': 'Art History',
		'ART': 'Studio Art',
		"CLAS": 'Classics',
		"DANC": 'Dance',
		"ENGL": 'English',
		"LAMS": 'Late Antique/Medieval Studies',
		"LIT": 'Literature',
		"MUS": 'Music',
		"PHIL": 'Philosophy',
		"THEA": 'Theatre'
	},
	
	'Math and Science': {
		'AISS': 'Accelerated Integrated Science Sequence',
		'AS': 'Aerospace Studies',
		'ASTR': 'Astronomy',
		'BIOL': 'Biology',
		'CHEM': 'Chemistry',
		"CSCI": 'Computer Science',
		"CSMT": 'Computer Science/Mathematics',
		"ENGR": 'Engineering',
		"GEOL": 'Geology',
		"MATH": 'Mathematics',
		"MOBI": 'Molecular Biology',
		"NEUR": 'Neuroscience',
		"PHYS": 'Physics',
	},

	'Social Science': {
		'ANTH': 'Anthropology',
		"ECON": 'Economics',
		"HIST": 'History',
		"IR": 'International Relations',
		"LGCS": 'Linguistics and Cognitive Science',
		"POLI": 'Politics',
		"PSYC": 'Psychology',
		"SOC": 'Sociology'
	},
	
	'Language': {
		'ARBC': 'Arabic',
		"CHIN": 'Chinese',
		"CHLT": 'Chican@/Latin@ Translation',
		"CHNT": 'Chinese in Translation',
		"FREN": 'French',
		"GERM": 'German',
		"GRMT": 'German in Translation',
		"ITAL": 'Italian',
		"JAPN": 'Japanese',
		"KORE": 'Korean',
		"PORT": 'Portuguese',
		"RUSS": 'Russian',
		"RUST": 'Russian in Translation',
		"SPAN": 'Spanish',
		"SPNT": 'Spanish in Translation'
	},
	
	'Anthro': {
		'AFRI': 'Africana Studies',
		'AMST': 'American Studies',
		'ASAM': 'Asian American Studies',
		'ASIA': 'Asian Studies',
		"CHST": 'Chicana/Chicano-Latina/Latino Studies',
		"FGSS": 'Feminism, Gender, and Sexuality Studies',
		"GFS": 'Gender and Feminist Studies',
		"GWS": 'Gender and Women\'s Studies'
	},
	
	'Other': {
		"CL": 'Core Lab',
		"CORE": 'Core',
		"CREA": 'Creative Studies',
		"EA": 'Environmental Analysis',
		"EDUC": 'Education',
		"FHS": 'Freshman Humanities Seminar',
		"FLAN": 'Foreign Languages',
		"GOVT": 'Government',
		"HMSC": 'Humanities Major: Culture',
		"HSID": 'History of Ideas',
		"HUM": 'Humanities',
		"ID": 'Interdisciplinary Studies',
		"IE": 'Integrative Experience',
		"IIS": 'International/Intercultural Studies',
		"LAST": 'Latin American Studies',
		"LGST": 'Legal Studies',
		"MCSI": 'Monroe Center, Social Inquiry',
		"MES": 'Middle Eastern Studies',
		"MGT": 'Management',
		"MILS": 'Military Science',
		"MLLC": 'Modern Language, Literature, and Culture',
		"MS": 'Media Studies',
		"ONT": 'Ontario Program',
		"ORST": 'Organizational Studies',
		"OSCI": 'Interdisciplinary/Other Science',
		"PE": 'Physical Education',
		"POST": 'Political Studies',
		"PP": 'Politics and Policy',
		"PPA": 'Public Policy Analysis',
		"PPE": 'Philosophy, Politics, and Economics',
		"REL": 'Religion',
		"RLIT": 'Romance Literatures',
		"RLST": 'Religious Studies',
		"SPCH": 'Speech',
		"SPE": 'School of Politics and Economics',
		"STS": 'Science, Technology, Society',
		"THES": 'Senior Thesis',
		"WRIT": 'Writing'
	}
};

// Populate the categories list.
for (var cat in categories) {
	var catEl = document.createElement('li');
	catEl.innerHTML = '<span>' + cat + '</span>';
	var discsEl = document.createElement('ul');
	for (var disc in categories[cat]) {
		var discEl = document.createElement('li');
		discEl.innerHTML = '<a href="#catalog/' + YEAR + '/' + SESS + '/' + disc + '">' + disc + ': ' + categories[cat][disc] + '</a>';
		discsEl.appendChild(discEl);
	}
	catEl.appendChild(discsEl);
	document.querySelector('#categories').appendChild(catEl);
}