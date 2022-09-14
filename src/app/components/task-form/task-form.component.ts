import { Component, OnInit } from '@angular/core';
import { Task } from '../../components/models/task';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2'
import * as XLSX from 'xlsx';
import { __values } from 'tslib'
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  tasks!: Task[];
  name = 'ExcelSheet.xlsx';
  
  public cameras:MediaDeviceInfo[]=[];
  public myDevice!: MediaDeviceInfo;
  public scannerEnabled=false;
  public results:string[]=[];
  public result:any
  public clear:any
  public save:any
  public area:any
  public lote:any
  public orden:any
  public producto:any
  public codigo:any
  public kg:any
  public mtr:any
  public prod1:any
  public code1:any
  public kg1:any
  public mtr1:any
  public total:any
  public total2!:number
  public total3!:number
  
  constructor(public taskService:TaskService) {
   
   }

  ngOnInit(): void {
    this.tasks=this.taskService.getTask();
    this.total=this.tasks.length
   
  
   
   
  }
// suma(){
//   for(let task of this.tasks){
//     this.total2=parseFloat((document.getElementById('lotes') as HTMLInputElement).value)
//         this.total2+=task.kg
//   }
// }
   addTask(newArea:HTMLInputElement,newLote:HTMLInputElement, newOrden:HTMLInputElement,newProducto:HTMLInputElement ,newCodigo:HTMLInputElement ,newKg:HTMLInputElement ,newMtr:HTMLInputElement){  
   let valor
  let total
  let pre
  for(let task of this.tasks){
    pre=task.kg
    this.total2+=pre
    
  }
   for (let index = 0; index < this.tasks.length; index++) {
    console.log(this.total2)
  
   }
  
   

    

   this.total2=parseFloat(this.total2+this.kg)
    for(let task of this.tasks){
      if((document.getElementById('lotes') as HTMLInputElement).value===task.lote){
      valor='repetido'
      }
          
    }
   
    

    if((document.getElementById('txtarea') as HTMLInputElement).value.length >= 30){
      
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error en almacén!!,El código no parece pertenecer a un almacén',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      if(valor==='repetido'){
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error en lote!!, El lote ya se encuentra en la lista',
          showConfirmButton: false,
          timer: 1500,
          
        }
       )
       this.lote=''
      }
      else{
        if((document.getElementById('txtarea') as HTMLInputElement).value==''){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se escaneo un Almacén!',
           
          })
        }else{
          if((document.getElementById('code') as HTMLInputElement).value==''){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Se requiere un lote!',
             
            })
          }else{
            console.log()
            this.total=this.tasks.length+1,
            this.taskService.addTask({
             
              area:newArea.value,
              cantidad:0,
              lote: newLote.value,
              orden: newOrden.value,
              producto:newProducto.value,
              codigo:newCodigo.value,
              kg:parseFloat(newKg.value),
              mtr:parseFloat(newMtr.value),
              hide:true
            })
            if((document.getElementById('check1') as HTMLInputElement).checked){
              this.lote=''
              this.lote.focus()
            }else{
            
              this.area=''
              this.lote=''
        
            }
        
          }
        }
      }
      
    }





   }
   exportToExcel(): void {
    let element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

vaciarArea(){
  this.area='';
}

limpiarTabla(){
  Swal.fire({
    title: 'Atencion!!!, Se eliminaran todos los datos capturados',
    text: "¿Deseas continuar?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ok, Continuar!'
  }).then((result) => {
   
    if (result.isConfirmed) {
      localStorage.clear()
      location.reload()
      
    }
  })
    ;
}
  camerasFoundHandler(cameras: MediaDeviceInfo[]){
    this.cameras=cameras;
    this.selectCamera(this.cameras[0].label);
  }

  // scanSuccessHandler(event:string){
   
  
  //   this.results.unshift(event);

   
  

    
  // }

  selectCamera(cameraLabel: string){    
    this.cameras.forEach(camera=>{
      if(camera.label.includes(cameraLabel)){
        this.myDevice=camera;
        console.log(camera.label);
        this.scannerEnabled=true;
      }
    })    
  }

 
    reproducir() {
      const audio = new Audio('assets/beep.mp3');
      audio.play();
    }


  scanSuccessHandler(event:string){
    const audio = new Audio('assets/song/beep.mp3');
    audio.play();
    this.results.unshift(event);
    
    if((document.getElementById('txtarea') as HTMLInputElement).value ===''){
      this.area=event
    }else{
     
      this.results.unshift(event);
      this.result=event.split('-')[1]
      this.prod1=this.result.split(',')[1]
      this.code1=this.result.split(',')[2]
      this.kg1=this.result.split(',')[3]
      this.mtr1=this.result.split(',')[4]
      this.save=this.result.split(',')[0];
      this.lote=event.split('-')[0];
      this.orden=this.save.split(':')[1];
      this.producto=this.prod1.split(':')[1];
      this.codigo=this.code1.split(':')[1];
      this.kg=this.kg1.split(':')[1];
      this.mtr=this.mtr1.split(':')[1];
    }
 
    console.log(this.results)
      }
}
