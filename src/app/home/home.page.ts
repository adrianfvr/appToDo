import { Component } from '@angular/core';
import { ITask } from '../interfaces/ITask';
import { AlertController, IonItemSliding } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  tasks: ITask[] = [];

  constructor(private _AlertController: AlertController) {}

  async open() {
    const alert = await this._AlertController.create({
      header: 'Agregar nueva tarea',
      inputs: [
        {
          type: 'text',
          name: 'title',
          placeholder: 'Ingrese titulo',
        },
      ],
      buttons: [
        {
          text: 'Agregar',
          handler: (data) => {
            this.tasks.push({
              id: this.tasks.length + 1,
              title: data.title,
              done: false,
            });
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }

  toggleTaskDone = (task: ITask, slidingItem: IonItemSliding) => {
    task.done = !task.done;
    console.log(this.tasks);
    slidingItem.close();
  };

  deleteTask = (task: ITask) => {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  };

  updateTask = async (task: ITask) => {
    const alert = await this._AlertController.create({
      header: 'Editar tarea',
      inputs: [
        {
          type: 'text',
          name: 'title',
          value: task.title,
        },
      ],
      buttons: [
        {
          text: 'Actualizar',
          handler: (data) => {
            this.tasks[this.tasks.indexOf(task)].title = data.title;
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  };
}
