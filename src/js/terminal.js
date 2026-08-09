/* Interactive CLI / Terminal Emulator Logic with Auto-Typing sequence */

const COMMANDS = {
  whoami: `<span class="cmd-success">Blessen P Shaju</span>`,

  focus: `<span class="cmd-info">Software | Cloud | DevOps</span>`,

  status: `<span class="cmd-emerald">Learning • Building • Improving</span>`,

  help: `Available Commands:
  • <span class="cmd-info">whoami</span>     : Display identity
  • <span class="cmd-info">focus</span>      : Display target developer domains
  • <span class="cmd-info">status</span>     : Current learning & building state
  • <span class="cmd-info">skills</span>     : Technical stack (Python, Linux, Docker, Cloud)
  • <span class="cmd-info">projects</span>   : Featured projects & code repositories
  • <span class="cmd-info">education</span>  : Academic background (BSc CS, MG University)
  • <span class="cmd-info">contact</span>    : Direct email & profile links
  • <span class="cmd-info">clear</span>      : Clear terminal screen`,

  skills: `Core Technical Stack:
  [Languages] : Python 3, C/C++, JavaScript, Bash, HTML/CSS, SQL
  [DevOps]    : Docker, Docker Compose, Linux Admin, Git, CI/CD Concepts
  [Cloud]     : Cloud Fundamentals, REST APIs, Networking (TCP/IP, HTTP)`,

  projects: `Featured Projects:
  1. Dockerized Microservice Lab (Nginx, FastAPI, Redis)
  2. Automated Linux System Monitor (Python, psutil, Webhooks)
  3. Cloud Infrastructure Cost Calculator (Interactive Web App)
  4. Student Analytics System (BSc CS Academic DBMS Project)`,

  education: `<span class="cmd-success">Bachelor of Science in Computer Science (BSc CS)</span>
University : Mahatma Gandhi University, Kottayam, Kerala
Focus      : Data Structures, Operating Systems, Networks, DBMS, Software Engineering`,

  contact: `Direct Contact Channels:
  • Email    : <a href="mailto:blessenpshaju@gmail.com" class="hl-cyan">blessenpshaju@gmail.com</a>
  • LinkedIn : <a href="https://linkedin.com/in/blessenpshaju" target="_blank" class="hl-cyan">linkedin.com/in/blessenpshaju</a>
  • GitHub   : <a href="https://github.com/blessenpshaju" target="_blank" class="hl-cyan">github.com/blessenpshaju</a>`
};

export function initTerminal() {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const quickCmdBtns = document.querySelectorAll('.quick-cmd-btn');

  if (!terminalInput || !terminalBody) return;

  // Auto-typing sequence on initial load
  const initialSequence = [
    { cmd: 'whoami', output: COMMANDS.whoami },
    { cmd: 'focus', output: COMMANDS.focus },
    { cmd: 'status', output: COMMANDS.status }
  ];

  async function runInitialSequence() {
    terminalBody.innerHTML = '';

    for (const step of initialSequence) {
      // Append prompt line
      const line = document.createElement('div');
      line.className = 'terminal-line';
      line.innerHTML = `<span class="prompt-symbol">blessen@devops</span>:<span class="prompt-path">~</span>$ <span class="typed-cmd"></span><span class="terminal-cursor"></span>`;
      terminalBody.appendChild(line);

      const typedSpan = line.querySelector('.typed-cmd');
      const cursor = line.querySelector('.terminal-cursor');

      // Type out command letter by letter
      for (let i = 0; i < step.cmd.length; i++) {
        typedSpan.textContent += step.cmd[i];
        await sleep(60);
      }

      await sleep(150);
      cursor.remove(); // remove cursor from line once typed

      // Render output
      const out = document.createElement('div');
      out.className = 'terminal-output';
      out.innerHTML = step.output;
      terminalBody.appendChild(out);

      await sleep(250);
    }

    // Append active input prompt line
    const activeLine = document.createElement('div');
    activeLine.className = 'terminal-line';
    activeLine.innerHTML = `<span class="prompt-symbol">blessen@devops</span>:<span class="prompt-path">~</span>$ <span class="terminal-cursor"></span>`;
    terminalBody.appendChild(activeLine);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  runInitialSequence();

  function executeCommand(cmdText) {
    const rawCmd = cmdText.trim().toLowerCase();
    
    // Create prompt line in history
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line';
    commandLine.innerHTML = `<span class="prompt-symbol">blessen@devops</span>:<span class="prompt-path">~</span>$ <span>${escapeHtml(cmdText)}</span>`;
    
    // Remove standalone active cursor line if present
    const activeCursors = terminalBody.querySelectorAll('.terminal-cursor');
    activeCursors.forEach(c => c.remove());

    terminalBody.appendChild(commandLine);

    if (rawCmd === 'clear') {
      terminalBody.innerHTML = '';
    } else if (COMMANDS[rawCmd]) {
      const outputDiv = document.createElement('div');
      outputDiv.className = 'terminal-output';
      outputDiv.innerHTML = COMMANDS[rawCmd];
      terminalBody.appendChild(outputDiv);
    } else if (rawCmd === '') {
      // empty command
    } else {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'terminal-output cmd-error';
      errorDiv.textContent = `zsh: command not found: ${cmdText}. Type 'help' for available commands.`;
      terminalBody.appendChild(errorDiv);
    }

    // Append new active cursor prompt line
    const nextLine = document.createElement('div');
    nextLine.className = 'terminal-line';
    nextLine.innerHTML = `<span class="prompt-symbol">blessen@devops</span>:<span class="prompt-path">~</span>$ <span class="terminal-cursor"></span>`;
    terminalBody.appendChild(nextLine);

    terminalInput.value = '';
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
    }
  });

  quickCmdBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        terminalInput.value = cmd;
        executeCommand(cmd);
      }
    });
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}
