import HttpService from './http.service';
import { Powerup, PowerupEditDto } from 'entities/Powerup';

class PowerupsApi extends HttpService {
  POWERUP_API = 'powerups';

  getPowerups = (): Promise<Powerup[]> => {
    return this.get(`${this.POWERUP_API}`);
  };

  createPowerup = (formData: FormData): Promise<Powerup[]> => {
    return this.post(`${this.POWERUP_API}`, formData);
  };

  editPowerup = (dto: PowerupEditDto): Promise<Powerup> => {
    return this.patch(`${this.POWERUP_API}/${dto.id}`, { ...dto });
  };

  deletePowerup = (powerupId: string) => {
    return this.delete(`${this.POWERUP_API}/${powerupId}`);
  };
}

export default new PowerupsApi({});
