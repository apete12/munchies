import { getDeliveryTimeEstimate } from './index';

describe('getDeliveryTimeEstimate', () => {
  it('should round to nearest 5 and create a 10-minute range', () => {
    expect(getDeliveryTimeEstimate(25)).toBe('20-30 min');
  });

  it('should handle values that round down', () => {
    expect(getDeliveryTimeEstimate(22)).toBe('15-25 min');  
    expect(getDeliveryTimeEstimate(23)).toBe('20-30 min'); 
  });

  it('should handle values that round up', () => {
    expect(getDeliveryTimeEstimate(28)).toBe('25-35 min');  
    expect(getDeliveryTimeEstimate(27)).toBe('20-30 min');  
  });

  it('should handle exact multiples of 5', () => {
    expect(getDeliveryTimeEstimate(20)).toBe('15-25 min');
    expect(getDeliveryTimeEstimate(30)).toBe('25-35 min');
    expect(getDeliveryTimeEstimate(45)).toBe('40-50 min');
  });

  it('should handle small delivery times', () => {
    expect(getDeliveryTimeEstimate(0)).toBe('-5-5 min');
    expect(getDeliveryTimeEstimate(5)).toBe('0-10 min');
    expect(getDeliveryTimeEstimate(10)).toBe('5-15 min');
  });

  it('should handle large delivery times', () => {
    expect(getDeliveryTimeEstimate(100)).toBe('95-105 min');
    expect(getDeliveryTimeEstimate(120)).toBe('115-125 min');
  });

  it('should handle decimal values', () => {
    expect(getDeliveryTimeEstimate(22.4)).toBe('15-25 min');
    expect(getDeliveryTimeEstimate(22.6)).toBe('20-30 min');
    expect(getDeliveryTimeEstimate(27.5)).toBe('25-35 min');
  });

  it('should handle edge case at midpoint (rounds to even)', () => {
    expect(getDeliveryTimeEstimate(12.5)).toBe('10-20 min');  
    expect(getDeliveryTimeEstimate(17.5)).toBe('15-25 min'); 
  });
});
