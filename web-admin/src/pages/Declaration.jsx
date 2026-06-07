import { useEffect, useState } from 'react';
import {
  getDepartments, createDepartment, toggleDepartment,
  getOffices, createOffice, toggleOffice,
  getDomains, addDomain, toggleDomain, deleteDomain
} from '../api/admin';
import styles from './Declaration.module.css';

export default function Declaration() {
  const [tab, setTab] = useState('departments'); // departments | offices | domains
  const [departments, setDepartments] = useState([]);
  const [offices, setOffices] = useState([]);
  const [domains, setDomains] = useState([]);
  const [newName, setNewName] = useState('');
  const [newDomain, setNewDomain] = useState('');
  const [message, setMessage] = useState('');

  const load = async () => {
    try {
      const [deptRes, officeRes, domainRes] = await Promise.all([
        getDepartments(),
        getOffices(),
        getDomains()
      ]);
      setDepartments(deptRes.items || []);
      setOffices(officeRes.items || []);
      setDomains(domainRes.domains || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  const addItem = async () => {
    if (!newName.trim()) return;
    try {
      if (tab === 'departments') await createDepartment(newName.trim());
      else if (tab === 'offices') await createOffice(newName.trim());
      setNewName('');
      load();
      setMessage('Added successfully.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add.');
    }
  };

  const addDomainItem = async () => {
    if (!newDomain.trim()) return;
    try {
      await addDomain(newDomain.trim());
      setNewDomain('');
      load();
      setMessage('Domain added.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add domain.');
    }
  };

  const toggleItem = async (id, currentActive) => {
    try {
      if (tab === 'departments') await toggleDepartment(id, !currentActive);
      else if (tab === 'offices') await toggleOffice(id, !currentActive);
      else if (tab === 'domains') await toggleDomain(id);
      load();
    } catch (err) {
      setMessage('Failed to toggle status.');
    }
  };

  const handleDeleteDomain = async (id) => {
    if (!window.confirm('Remove this domain?')) return;
    try {
      await deleteDomain(id);
      load();
    } catch (err) {
      setMessage('Failed to delete domain.');
    }
  };

  return (
    <div>
      <h1>Declaration</h1>
      <div className={styles.tabs}>
        <button
          className={tab === 'departments' ? styles.activeTab : ''}
          onClick={() => setTab('departments')}
        >Departments</button>
        <button
          className={tab === 'offices' ? styles.activeTab : ''}
          onClick={() => setTab('offices')}
        >Offices</button>
        <button
          className={tab === 'domains' ? styles.activeTab : ''}
          onClick={() => setTab('domains')}
        >Domains</button>
      </div>

      {tab !== 'domains' ? (
        <div className={styles.card}>
          <div className={styles.addForm}>
            <input
              type="text"
              placeholder={`New ${tab.slice(0, -1)} name`}
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className={styles.input}
            />
            <button onClick={addItem} className={styles.btn}>Add</button>
          </div>
          {message && <p className={styles.msg}>{message}</p>}

          <table className={styles.table}>
            <thead>
              <tr><th>Name</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {(tab === 'departments' ? departments : offices).map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.is_active ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button onClick={() => toggleItem(item.id, item.is_active)}>
                      {item.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
              {(tab === 'departments' ? departments : offices).length === 0 && (
                <tr><td colSpan="3">No items found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.card}>
          <div className={styles.addForm}>
            <input
              type="text"
              placeholder="e.g., pup.edu.ph"
              value={newDomain}
              onChange={e => setNewDomain(e.target.value)}
              className={styles.input}
            />
            <button onClick={addDomainItem} className={styles.btn}>Add Domain</button>
          </div>
          {message && <p className={styles.msg}>{message}</p>}

          <table className={styles.table}>
            <thead>
              <tr><th>Domain</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {domains.map(d => (
                <tr key={d.id}>
                  <td>{d.domain}</td>
                  <td>{d.is_active ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button onClick={() => toggleItem(d.id, d.is_active)}>
                      {d.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button onClick={() => handleDeleteDomain(d.id)} style={{ marginLeft: 8, background: '#ef4444', color: 'white', border: 'none', padding: '4px 8px', borderRadius: 4, cursor: 'pointer' }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {domains.length === 0 && (
                <tr><td colSpan="3">No domains added.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}