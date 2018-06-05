import { readFileSync, existsSync } from 'fs';

const path = "/proc/1/sched";

export default function () {
  try {
    // If it's not running in linux.
    if (!existsSync(path)) return false;
    let str = readFileSync(path, 'utf8').split('\n')[0];
    // first line should be:
    // <process_name> (<os_pid>, #threads: <thread_count>)
    str = str.substr(str.indexOf('(') + 1);
    str = str.substr(0, str.indexOf(','));
    if (!str.match(/^\d+$/)) return false;
    return parseInt(str) > 1;
  } catch (_) {
    return false;
  }
}
