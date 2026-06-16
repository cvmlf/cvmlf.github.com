/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
    $('.page-scroll a').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function () {
    $('.navbar-toggle:visible').click();
});



// load the live results from the website
$(document).ready(function () {
  checkLive();
});

let timerId = setInterval(() => checkLive(), 1000*120);

function renderLive(data) {
  if (data.anglers) data.anglers.sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight));
  if (data.individual_standings) data.individual_standings.sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight));

  return `
    ${header(data)}
    ${infoRow(data)}
    <div class="row">
      <div class="col-md-6" style="text-align:center;">
        ${data.championship && data.period_results ? championship(data) : ''}
        ${data.team && data.team_standings ? teamView(data) : ''}
        ${!data.championship && !data.team ? leaderBoard(data) : ''}
      </div>
      <div class="col-md-6" style="text-align:center;">
        ${fishCaught(data)}
      </div>
    </div>`;
}

function header(data) {
  let suffix = '';
  if (data.championship) suffix = ' (Championship)';
  else if (data.team) suffix = ' (Team Challenge)';
  else if (data.road_runner) suffix = ' (Road Runner)';

  return `<div style="text-align:center;font-size:2em;font-weight:700;">${data.lake}${suffix}</div>`;
}

function infoRow(data) {
  let items = [];
  if (data.team && data.team_limit > 0) items.push(`<span class="live-info-item">Team Limit: ${data.team_limit} fish</span>`);
  if (data.limit > 0) items.push(`<span class="live-info-item">Limit: ${data.limit} fish per angler</span>`);
  if (data.min_weight && data.min_weight !== '0') items.push(`<span class="live-info-item">Minimum Weight: ${data.min_weight}</span>`);
  else items.push(`<span class="live-info-item">Minimum Weight: n/a</span>`);
  if (data.target_weight) items.push(`<span class="live-info-item">Target Weight: ${data.target_weight}</span>`);
  for (let p of data.periods) {
    items.push(`<span class="live-info-item">Period ${p.number}: ${p.lines_in} - ${p.lines_out}</span>`);
  }
  return `
    <div style="text-align:center;">
      <div style="display:inline-block;width:auto;">
        <div class="live-info-container">${items.join('')}</div>
      </div>
    </div>`;
}

function table(headers, rows, foot) {
  let h = headers.map(h => `<th style="text-align:left;${h[1] || ''}">${h[0]}</th>`).join('');
  let r = rows.map(cells => `<tr>${cells.map(c => `<td style="text-align:left;${c[1] || ''}">${c[0]}</td>`).join('')}</tr>`).join('');
  return `
    <div class="table-responsive" style="display:inline-block;text-align:left;width:auto;font-size:18px;">
      <table class="table table-condensed live-striped">
        <thead><tr>${h}</tr></thead>
        <tbody>${r}</tbody>
        ${foot ? `<tfoot><tr><td colspan="${headers.length}" style="text-align:center;padding-top:8px;"><em>${foot}</em></td></tr></tfoot>` : ''}
      </table>
    </div>`;
}

function championship(data) {
  let p2 = data.period_results[1];
  let champRows = p2.results.map(r => [[r.name, 'padding-right:96px;'], [`${r.weight} lbs`]]);

  let p1 = data.period_results[0];
  let qualRows = [];
  for (let r of p1.results) {
    if (r.cut_line) {
      qualRows.push([['--- Cut Line ---', 'text-align:center;padding:4px 0;font-style:italic;color:rgba(255,255,255,0.7);'], ['', 'display:none;']]);
    } else {
      qualRows.push([[r.name, 'padding-right:96px;'], [`${r.weight} lbs`]]);
    }
  }

  return `
    <p style="text-align:center"><strong>Championship Round</strong></p>
    ${table([['Angler', 'padding-right:96px;'], ['Weight', '']], champRows, data.big_bass)}
    <p style="text-align:center;margin-top:20px;"><strong>Qualifying Round</strong></p>
    ${table([['Angler', 'padding-right:96px;'], ['Weight', '']], qualRows)}`;
}

function teamView(data) {
  data.team_standings.sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight));
  let teamRows = data.team_standings.map(t => [[t.members.join(' | '), 'padding-right:96px;'], [`${t.weight} lbs`]]);

  let indRows = [];
  if (data.individual_standings) {
    indRows = data.individual_standings.map(a => [[a.name, 'padding-right:96px;'], [`${a.weight} lbs`, 'padding-right:96px;'], [a.fish]]);
  }

  return `
    <p style="text-align:center"><strong>Team Leader Board</strong></p>
    ${table([['Team', 'padding-right:96px;'], ['Weight', '']], teamRows)}
    ${data.individual_standings ? `
      <p style="text-align:center;margin-top:20px;"><strong>Individual Standings</strong></p>
      ${table([['Angler', 'padding-right:96px;'], ['Weight', 'padding-right:96px;'], ['Fish', '']], indRows)}
      <p style="text-align:center;font-style:italic;margin-top:8px;"><em>${data.big_bass}</em></p>` : ''}`;
}

function leaderBoard(data) {
  let rows = data.anglers.map(a => [[a.name, 'padding-right:96px;'], [`${a.weight} lbs`, 'padding-right:96px;'], [a.fish]]);
  return `
    <p style="text-align:center"><strong>Leader Board</strong></p>
    ${table([['Angler', 'padding-right:96px;'], ['Weight', 'padding-right:96px;'], ['Fish', '']], rows, data.big_bass)}`;
}

function fishCaught(data) {
  let rows = data.fish_caught.map(f => [[f.angler, 'padding-right:96px;'], [`${f.weight} lbs${f.time ? ` (${f.time})` : ''}`]]);
  return `
    <p style="text-align:center"><strong>Fish Caught</strong></p>
    ${table([['Angler', 'padding-right:96px;'], ['Weight', '']], rows)}`;
}

function checkLive() {
    $.ajax({
        url: "https://live.cvmlf.com/live",
        cache: false,
        dataType: "text"
    })
    .done(function (data) {
        try {
            var json = JSON.parse(data);
            if (json.message) {
                $("#live-header").html('<div class="message-banner">' + json.message + '</div>');
            } else {
                $("#live-header").html(renderLive(json));
            }
        } catch(_e) {
            $("#live-header").html(data);
        }
    })
    .fail(function() {
      clearInterval(timerId);
    });
}

