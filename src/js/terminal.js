/* Interactive CLI / Terminal Emulator Logic with Developer & Data Analytics commands */

const COMMANDS = {
  whoami: `<span class="cmd-success">Blessen P Shaju</span> — Computer Science Graduate & MSc CS Postgraduate Student`,

  focus: `<span class="cmd-info">Software Development • Data Analytics • Cloud & DevOps Infrastructure</span>`,

  status: `<span class="cmd-emerald">Active MSc Student • Building Full-Stack Software • Exploring Cloud & Linux Systems</span>`,

  help: `Available Commands:
  • <span class="cmd-info">whoami</span>     : Display identity & academic profile
  • <span class="cmd-info">focus</span>      : Display core technical specializations
  • <span class="cmd-info">status</span>     : Current learning and project status
  • <span class="cmd-info">skills</span>     : Core technical tooling (Python, SQL, Linux, Docker)
  • <span class="cmd-info">projects</span>   : Featured software and data projects
  • <span class="cmd-info">education</span>  : Academic background (BSc CS Graduate, MSc CS Pursuing)
  • <span class="cmd-info">contact</span>    : Direct channels (Email, GitHub, LinkedIn)
  • <span class="cmd-info">clear</span>      : Clear the terminal screen`,

  skills: `Core Technical Stack:
  [Programming]   : Python, Java, SQL, JavaScript (ES6+), HTML5, CSS3, PHP
  [Data & DBMS]   : SQL, Relational DBMS (MySQL, Oracle SQL), Data Analysis Concepts
  [DevOps/Cloud]  : Linux (Bash), Docker, Git/GitHub, Cloud Fundamentals, WSL`,

  projects: `Featured Projects:
  1. Lab Activity Reporting System (LARS) [PHP, MySQL, Web Portal]
  2. RigMasterAI [Python, AI/ML APIs, Automation, Live Demo]`,

  education: `<span class="cmd-success">1. MSc Computer Science (Currently Pursuing)</span>
   Institution : Rajagiri College of Social Sciences, Kerala
<span class="cmd-success">2. BSc Computer Science (Graduate)</span>
   College     : SSV College, Valayanchirangara
   University  : Mahatma Gandhi University, Kerala`,

  contact: `Direct Contact Channels:
  • Email    : <a href="mailto:blessenpshaju@gmail.com" class="hl-cyan">blessenpshaju@gmail.com</a>
  • LinkedIn : <a href="https://www.linkedin.com/in/blessen-p-shaju" target="_blank" rel="noopener noreferrer" class="hl-cyan">linkedin.com/in/blessen-p-shaju</a>
  • GitHub   : <a href="https://github.com/blessen5" target="_blank" rel="noopener noreferrer" class="hl-cyan">github.com/blessen5</a>`,

  docker: `<span class="cmd-info">CONTAINER ID   IMAGE            COMMAND                  CREATED         STATUS         PORTS</span>
  c3d4e5f6a1b2   nginx:alpine     "/docker-entrypoint.…"   3 hours ago     Up 3 hours     0.0.0.0:80->80/tcp
  f1a2b7c8d9e0   redis:7-alpine   "docker-entrypoint.s…"   3 hours ago     Up 3 hours     6379/tcp`
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
      const line = document.createElement('div');
      line.className = 'terminal-line';
      line.innerHTML = `<span class="prompt-symbol">blessen@dev</span>:<span class="prompt-path">~</span>$ <span class="typed-cmd"></span><span class="terminal-cursor"></span>`;
      terminalBody.appendChild(line);

      const typedSpan = line.querySelector('.typed-cmd');
      const cursor = line.querySelector('.terminal-cursor');

      for (let i = 0; i < step.cmd.length; i++) {
        typedSpan.textContent += step.cmd[i];
        await sleep(50);
      }

      await sleep(120);
      cursor.remove();

      const out = document.createElement('div');
      out.className = 'terminal-output';
      out.innerHTML = step.output;
      terminalBody.appendChild(out);

      await sleep(180);
    }

    const activeLine = document.createElement('div');
    activeLine.className = 'terminal-line';
    activeLine.innerHTML = `<span class="prompt-symbol">blessen@dev</span>:<span class="prompt-path">~</span>$ <span class="terminal-cursor"></span>`;
    terminalBody.appendChild(activeLine);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  runInitialSequence();

  function executeCommand(cmdText) {
    const rawCmd = cmdText.trim().toLowerCase();
    
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line';
    commandLine.innerHTML = `<span class="prompt-symbol">blessen@dev</span>:<span class="prompt-path">~</span>$ <span>${escapeHtml(cmdText)}</span>`;
    
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

    const nextLine = document.createElement('div');
    nextLine.className = 'terminal-line';
    nextLine.innerHTML = `<span class="prompt-symbol">blessen@dev</span>:<span class="prompt-path">~</span>$ <span class="terminal-cursor"></span>`;
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
