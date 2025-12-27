import { roadtripsService } from '@/services/api/roadtrips.service';

describe('roadtripsService', () => {
  it('should fetch all roadtrips', async () => {
    const data = await roadtripsService.getAll();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('should fetch roadtrip by id', async () => {
    const roadtrip = await roadtripsService.getById('rt1');
    expect(roadtrip.title).toBe('California Coast');
  });

  it('should throw error if roadtrip not found', async () => {
    await expect(roadtripsService.getById('non-existent')).rejects.toThrow('Roadtrip not found');
  });

  it('should create and then delete a roadtrip', async () => {
    const newRt: any = { id: 'test-rt', userId: 'user1', title: 'Test', stats: { distance: 0, duration: 0 }, polyline: [], countries: [] };
    
    await roadtripsService.create(newRt);
    let all = await roadtripsService.getAll();
    expect(all.find(r => r.id === 'test-rt')).toBeDefined();

    await roadtripsService.delete('test-rt');
    all = await roadtripsService.getAll();
    expect(all.find(r => r.id === 'test-rt')).toBeUndefined();
  });
});
