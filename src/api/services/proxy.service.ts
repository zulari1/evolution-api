import { InstanceDto } from '@api/dto/instance.dto';
import { ProxyDto } from '@api/dto/proxy.dto';
import { Logger } from '@config/logger.config';
// Removed import of Proxy from '@prisma/client' because it does not exist

import { WAMonitoringService } from './monitor.service';

export class ProxyService {
  constructor(private readonly waMonitor: WAMonitoringService) {}

  private readonly logger = new Logger('ProxyService');

  public create(instance: InstanceDto, data: ProxyDto) {
    this.waMonitor.waInstances[instance.instanceName].setProxy(data);

    return { proxy: { ...instance, proxy: data } };
  }

  // Returning Promise<any> instead of Proxy type since it doesn't exist
  public async find(instance: InstanceDto): Promise<any> {
    try {
      const result = await this.waMonitor.waInstances[instance.instanceName].findProxy();

      if (Object.keys(result).length === 0) {
        throw new Error('Proxy not found');
      }

      return result;
    } catch {
      return null;
    }
  }
}
